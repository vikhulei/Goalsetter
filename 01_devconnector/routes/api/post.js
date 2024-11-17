const express = require ('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')


//@route PUT api/post/comment/:id
//@desc Add a comment
//@access Private

router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]],
async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.send(400).json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }


        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


//@route DELETE api/post/comment/:id/:comment_id
//@desc Delete a comment
//@access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)

        //pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
        //make sure comment exists
        if(!comment) {
            return res.status(404).json({msg: 'comment does not exist'})
        }

        //check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'user is not authorized'})
        }

        const indexOfComment = post.comments.map(comments => comment.user.toString()).indexOf(req.user.id)
        await post.comments.splice(indexOfComment, 1)

        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})




//@route PUT api/post/like/:id
//@desc Like a post
//@access Private

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //Check if the post has already been liked by this user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'post alredy liked'})
        }

        post.likes.unshift({ user: req.user.id})

        await post.save()

        res.json([post.likes])

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


//@route PUT api/post/unlike/:id
//@desc Unlike a post
//@access Private

router.get('/unlike/:id', auth, async (req, res) => {
    try {
        
    const post = await Post.findById(req.params.id)

    const filteredUser = post.likes.filter((like) => like.user.toString() === req.user.id)

    if (filteredUser.length === 0) {

        return res.send('You cant unlike it')
    }

    const indexOfLike = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
    await post.likes.splice(indexOfLike, 1)

    await post.save()
    res.json(post)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }



})

//--------------------
//--------------------

//@route POST api/post
//@desc Create a post
//@access Private

router.post('/', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()

]], async  (req, res) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            
            const user = await User.findById(req.user.id).select('-password')
    
            const newPost = new Post ({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save()

            res.json(post)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
})


//@route GET api/posts
//@desc Get all posts
//@access Private

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

//@route GET api/post/:id
//@desc Get post by post id
//@access Private

router.get('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json({msg :'Post not found'})
        }
        res.json(post)
    
    } catch (err) {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg :'Post not found'})
        }
        console.error(err.message)
        res.status(500).send('Server error')
    }
    
    
    })
    
    
    //@route DELETE api/post/:id
    //@desc DELETE post by post id
    //@access Private
    
    router.delete('/:id', auth, async (req, res) => {
    
        try {
            const post = await Post.findById(req.params.id)
    
            // check user (only the owner can delete his post)
    
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({msg: 'User not authorized'})
            }
    
    
            if(!post) {
                return res.status(404).json({msg :'Post not found'})
            }
    
            await post.deleteOne()
    
            res.json({ msg: 'Post removed' })
        
        } catch (err) {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({msg :'Post not found'})
            }
            console.error(err.message)
            res.status(500).send('Server error')
        }
        
        })

module.exports = router