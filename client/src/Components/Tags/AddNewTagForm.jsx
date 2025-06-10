import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateTag } from "../managers/tagManager"


export const NewTagForm = () => {

    const [tag, setAllTags] = useState({ name: "" })

    const navigate = useNavigate()

    const handleSave = (evt) => {
        evt.preventDefault()
         const newTag = {
            name: tag.name
        }
        CreateTag(newTag).then(() => {
            navigate(`/tags`)
        })
    }



    return (

        <form>
            <h2 className="header">Add a new Tag to the list</h2>
            <div className="form-container">
                <div className="form-box">


                    <fieldset>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={tag?.name}
                                onChange={(evt) => {
                                    const copy = { ...tag }
                                    copy.name = evt.target.value
                                    setAllTags(copy)
                                }}
                                required
                                className="form-container" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button onClick={handleSave}
                                className="new-tag-button">Save Tag</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    )
}
