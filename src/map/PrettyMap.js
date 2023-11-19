import {useEffect, useState} from "react";

const obninskId = "kl_26";
const bananaId = "kl_19";

function PrettyMap({data, childId, children}) {
    const [currentData, setCurrentData] = useState([]);

    let doDrawLines = true;
    let doDrawNumbers = true;
    let doDrawCircles = true;
    let isLineAnimated = true;

    let center = "kl_25";

    useEffect(() => {
            const svgElement = document.getElementById(childId);

            let drawData = convertRawDataToDrawData(data);

            removePreviouslyRenderedElements(svgElement);

            if (doDrawLines) {
                drawLines(drawData, center, isLineAnimated, svgElement);
            }
            }

            if (doDrawCircles) {
            }

            if (doDrawNumbers) {
            }

            setCurrentData(drawData);
        }
        ,
        [data]
    );

    return (children);
}

function calcElementPosition(regionRect, regionId = "") {
    let regionRectCenter = {
        x: regionRect.x + regionRect.width / 2,
        y: regionRect.y + regionRect.height / 2
    };

    //TODO: Hardcoded ID, убрать по возможности (или хотя бы исправить)
    if (regionId === bananaId) {
        regionRectCenter.x += 25;
    }
    if (regionId === obninskId) {
        regionRectCenter.x += 70;
        regionRectCenter.y -= 30;
    }

    return regionRectCenter;
}

function createLineElement(regionId, regionRectCenter, targetRectCenter, isLineAnimated = false, animationSpeed = 1, lineColor = "#176dea") {
    let lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
    // s.setAttribute('dominant-baseline', 'middle')
    lineElement.setAttribute("id", regionId + "_line");
    lineElement.setAttribute("stroke", lineColor);
    lineElement.setAttribute("x1", regionRectCenter.x);
    lineElement.setAttribute("y1", regionRectCenter.y);
    lineElement.setAttribute("x2", targetRectCenter.x);
    lineElement.setAttribute("y2", targetRectCenter.y);
    // lineElement.setAttribute('class', 'rendered')
    lineElement.classList.add("rendered");

    if (isLineAnimated) {
        lineElement.setAttribute("stroke-dasharray", "40 10");
        // lineElement.setAttribute('stroke-dasharray', '300 600')

        let anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");

        anim.setAttribute("attributeName", "stroke-dashoffset");
        anim.setAttribute("values", "100%; 0%");
        anim.setAttribute("dur", Math.floor(100 / animationSpeed) + "s");
        // anim.setAttribute('dur', '10s')
        anim.setAttribute("repeatCount", "indefinite");
        anim.setAttribute("fill", "freeze");
        anim.classList.add("rendered");
        lineElement.append(anim);
    }
    return lineElement;
}

function drawLines(drawData, targetId, isLineAnimated, root) {
    let targetElement = root.getElementById(targetId);
    let lineTargetRect = targetElement.getBBox();

    let targetRectCenter = {
        x: lineTargetRect.x + lineTargetRect.width / 2,
        y: lineTargetRect.y + lineTargetRect.height / 2
    };

    for (const obj of drawData) {
        let regionId = obj.id;
        let count = obj.count;

        let regionElement = root.getElementById(regionId);
        if (regionElement != null) {
            if (regionElement !== targetElement && count !== 0) {
                let regionRect = regionElement.getBBox();

                let regionRectCenter;
                if (regionId === bananaId)
                    regionRectCenter = calcElementPosition(regionRect, regionId);
                else
                    regionRectCenter = calcElementPosition(regionRect);

                let lineElement = createLineElement(regionId,
                    regionRectCenter,
                    targetRectCenter,
                    isLineAnimated,
                    count);

                root.append(lineElement);
            }
        }
    }
}

function convertRawDataToDrawData(data) {
    let drawData = [];
    for (const [id, rawData] of Object.entries(data)) {
        if (rawData["count"] !== 0) {
            drawData.push({id: rawData["id"], count: rawData["count"]});
        }
    }
    return drawData;
}

function removePreviouslyRenderedElements(root) {
    let renderedElements = root.getElementsByClassName("rendered");
    while (renderedElements[0]) {
        renderedElements[0].parentNode.removeChild(renderedElements[0]);
    }
}


export default PrettyMap;
