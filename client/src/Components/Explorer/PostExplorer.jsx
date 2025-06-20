import { useState, useEffect } from "react";
import { GetTags } from "../managers/tagManager";
import { getAllPosts, getPostsByTagId } from "../managers/postManager";
export const PostExplorer = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allTags, setAllTags] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedTagId, setSelectedTagId] = useState(null);

    useEffect(() => {
        if (selectedTagId) {
            getPostsByTagId(selectedTagId).then((posts) => {
                setFilteredPosts(posts);
            });
        } else {
            getAllPosts().then((posts) => {
                setAllPosts(posts);
                setFilteredPosts(posts);
            });
        }
    }, [selectedTagId]);

    useEffect(() => {
        GetTags().then(setAllTags)
    }, []);


    const handleSearch = () => {
        const filtered = allPosts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleTagClick = (tagId) => {
        setSelectedTagId((prevTagId) => (prevTagId === tagId ? null : tagId));
    };


    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
            />
            <button
            onClick={handleSearch}>Search
            </button>
            
            <h2>Search By Tag</h2>
            {allTags.map((tag) => (
                <div key={tag?.id}>
                    <button onClick={() => handleTagClick(tag.id)}># {tag.name}</button>
                </div>
            ))}
            {filteredPosts.map((post) => (
                <div key={post?.id}>
                    <h3>Post Number: {post.id}</h3>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    <p>Published on: {new Date(post.publishingDate).toLocaleDateString()}</p>
                    <p>Read Time: {post.readTime}</p>
                </div>
            ))}
        </>
    );

  
};
