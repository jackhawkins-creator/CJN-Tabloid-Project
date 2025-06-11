import { useEffect, useState } from "react"
import { getAllPosts } from "../components/managers/postManager"
import { getAllUserProfiles } from "../Components/managers/userProfileManager"

export const Home = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => {
        getAllPosts().then(setAllPosts),
        getAllUserProfiles().then(setAllAuthors)
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = String(date.getMonth() + 1).padStart(2,"0")
        const day = String(date.getDate()).padStart(2, "0")
        const year = date.getFullYear()

        return `${month}/${day}/${year}`
    }

    return (
        <>
        <div className="posts-container">
            <h1>Latest Posts</h1>
            {allPosts.slice(0,1).map((post) => 
            <div key={post.id} className="most-recent-post">
                <img src={post.headerImageUrl} />
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
                <div className="most-recent-footer">
                    <p className="post-published">Published {formatDate(post.publishingDate)}</p>
                </div>
            </div>
            )}
            <div className="recent-posts">
                {allPosts.slice(1,3).map((post) => 
                <div className="recent-post" key={post.id}>
                    <img src={post.headerImageUrl} className="header-image" />
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    <div className="post-footer">
                        <p className="post-published">Published {formatDate(post.publishingDate)}</p>
                    </div>
                </div>)}
            </div>
        </div>
        <div className="author-container">
            <h2>New Authors</h2>
            {allAuthors.slice(0,8).map((author) => 
            <div className="author" key={author.id}>
                <div className="author-name">{author.firstName} {author.lastName}</div>
                <p className="author-join-date">{author.timeSinceJoin}</p>
            </div>
            )}
        </div>
        </>
    )
}