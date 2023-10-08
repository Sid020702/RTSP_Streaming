import React, { useState } from "react"
import { Rnd } from "react-rnd"
import { useSelector, useDispatch } from "react-redux"
import { addLogo } from "../../actions/logos"
import { useDrag } from "react-dnd";
const RndContainer = ({ children, def, url, ...props }) => {
    const logos = [...useSelector(state => state.logosReducer.logos)]
    let logo = logos.findIndex(logo => logo.url === url)
    const dispatch = useDispatch()
    const [{ opacity }, drag] = useDrag({
        type: "logo",
        item: () => ({ id: url }),
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    return (
        <div ref={drag} className="rnd">
            <Rnd
                default={def}
                onDragStop={(e, d) => {
                    logos[logo]["x"] = d.x
                    logos[logo]["y"] = d.y
                    dispatch(addLogo(logos))
                }}
                style={{
                    border: "solid 1px #ddd",
                    background: "#f0f0f0",
                }}
                size={{
                    width: `${logos[logo]["width"] ? logos[logo]["width"] : "100px"}`,
                    height: `${logos[logo]["height"] ? logos[logo]["height"] : "100px"}`
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    let width = ref.style.width
                    let height = ref.style.height
                    logos[logo]["width"] = width
                    logos[logo]["height"] = height
                    dispatch(addLogo(logos))
                }}
            >{children}</Rnd>

        </div>
    )
}

export default RndContainer