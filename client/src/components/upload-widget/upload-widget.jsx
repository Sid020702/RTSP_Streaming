import React from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setOverlayUrl } from '../../actions/overlay.js'
import { useSelector } from 'react-redux'
import { addLogo } from '../../actions/logos.js'


const UploadWidget = ({ children, isLogo, ...props }) => {
    const cloudinaryRef = useRef()
    const dispatch = useDispatch()
    const logos = [...useSelector(state => state.logosReducer.logos)]

    const widgetRef = useRef()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "drauu5bdm",
            uploadPreset: 'w5ukvs1h',

            options: {
                allowed_formats: ['png', 'jpg']
            }
        }, function (error, result) {
            if (result.event === 'success') {
                if (isLogo) {
                    logos.push({ url: result.info.secure_url, x: 0, y: -(window.innerHeight / 2) })
                    dispatch(addLogo(logos))
                }
                else {
                    dispatch(setOverlayUrl(result.info.secure_url))
                }

            }

        }
        )

    }, [])
    return (
        <div>
            <button onClick={(e) => {
                e.preventDefault()

                widgetRef.current.open()
            }
            }>{children}</button>
        </div>


    )
}

export default UploadWidget