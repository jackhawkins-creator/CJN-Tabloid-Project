import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetTagById, updateTag } from "../managers/tagManager"




export const EditTagForm = ({}) => {

    const  [tag, setTag ] = useState({ name: "" })

    const navigate = useNavigate()

    const { id } = useParams()

   
    useEffect(() => {
    GetTagById(id).then((data) => {
        const tagObj = data
        setTag(tagObj)
    })
}, [id])




const handleSave = (evt) => {
    evt.preventDefault()

    const editedTag = {
        id: tag.id,
        name: tag.name,
       

    }
    updateTag(editedTag).then(() => {
        navigate(`/tags`)
    })
}



    return (
   
        <form className="profile">    
        <h2 className="header">Edit Tag</h2>
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
                            setTag(copy)
                        } }
                        required
                        className="form-container" />
                </div>
            </fieldset>

                <fieldset>
                    <div className="form-group">
                        <button onClick={handleSave}
                            className="edit-church-button">Save Tag</button>
                    </div>
                </fieldset>
               </div>   
            </div>
        </form>
    )
}
