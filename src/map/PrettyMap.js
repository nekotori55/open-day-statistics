import React, {useEffect, useState} from "react";

function PrettyMap({data, childId, children}) {
    const [currentData, setCurrentData] = useState([]);

    let doDrawLines = true;
    let doDrawNumbers = true;
    let doDrawCircles = true;
    let isLineAnimated = true;

    useEffect(() => {
            const svgRoot = document.getElementById(childId)

            let drawData = convertRawDataToDrawData(data);

            removePreviouslyRenderedElements(svgRoot);

            if (doDrawLines) {
                let lineTargetId = "kl_25"
                let lineTargetElement = svgRoot.getElementById(lineTargetId)

                drawLines(drawData, lineTargetElement, isLineAnimated, svgRoot);
            }

            if (doDrawCircles) {
            }

            if (doDrawNumbers) {
            }

            setCurrentData(drawData)
        }
        ,
        [data]
    )

    return (children);
}

function drawLines(newDrawData, targetElement, isLineAnimated, svgRoot) {
    let lineTargetRect = targetElement.getBBox()

    for (const obj of newDrawData) {
        let regionId = obj.id
        let count = obj.count

        let regionElement = document.getElementById(regionId);
        if (regionElement != null) {
            if (regionElement !== targetElement && count !== 0) {
                let regionRect = regionElement.getBBox()

                let lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line")
                // s.setAttribute('dominant-baseline', 'middle')
                lineElement.setAttribute('id', regionId + '_line')
                lineElement.setAttribute('stroke', '#176dea')
                lineElement.setAttribute('x1', regionRect.x + regionRect.width / 2)
                lineElement.setAttribute('y1', regionRect.y + regionRect.height / 2)
                lineElement.setAttribute('x2', lineTargetRect.x + lineTargetRect.width / 2)
                lineElement.setAttribute('y2', lineTargetRect.y + lineTargetRect.height / 2)
                // lineElement.setAttribute('class', 'rendered')
                lineElement.classList.add("rendered")


                if (isLineAnimated) {
                    lineElement.setAttribute('stroke-dasharray', '40 10')
                    // lineElement.setAttribute('stroke-dasharray', '300 600')

                    let anim = document.createElementNS("http://www.w3.org/2000/svg", "animate")

                    anim.setAttribute('attributeName', 'stroke-dashoffset')
                    anim.setAttribute('values', '100%; 0%')
                    anim.setAttribute('dur', Math.floor(100 / count) + 's')
                    // anim.setAttribute('dur', '10s')
                    anim.setAttribute('repeatCount', 'indefinite')
                    anim.setAttribute('fill', 'freeze')
                    anim.classList.add("rendered")
                    lineElement.append(anim)

                }
                svgRoot.append(lineElement)
            }
        }
    }
}

function convertRawDataToDrawData(data) {
    let drawData = []
    for (const [id, rawData] of Object.entries(data)) {
        if (rawData['count'] !== 0) {
            drawData.push({id: rawData['id'], count: rawData['count']})
        }
    }
    return drawData;
}

function removePreviouslyRenderedElements(svgRoot) {
    let renderedElements = svgRoot.getElementsByClassName('rendered')
    while (renderedElements[0]) {
        renderedElements[0].parentNode.removeChild(renderedElements[0])
    }
}


export default PrettyMap;
