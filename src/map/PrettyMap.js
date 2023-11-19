import {useEffect, useState} from "react";

const obninskId = "kl_obn";
const bananaId = "kl_suh";

function PrettyMap({data, childId, children}) {
    const [currentData, setCurrentData] = useState([]);

    let doDrawLines = true;
    let doDrawNumbers = true;
    let doDrawCircles = true;
    let isLineAnimated = true;

    let center = "kl_kal_dot";

    useEffect(() => {
            const svgElement = document.getElementById(childId);
            let drawData = convertRawDataToDrawData(data);

            const citiesLayer = document.getElementById("layer2");
            citiesLayer.setAttribute("display", "none")

            removePreviouslyRenderedElements(svgElement);

            if (doDrawLines) {
                drawLines(drawData, center, isLineAnimated, svgElement);
            }

            let isObninskWithData = drawData.some((va) => {return (va.id === obninskId) && (va.count > 0)});

            if ((doDrawNumbers || doDrawCircles) && isObninskWithData) {
                let obninsk_element = svgElement.getElementById(obninskId);
                let obninsk_box = obninsk_element.getBBox();

                let vinoska_center = calcElementPosition(obninsk_box, obninskId);
                let obninsk_center = calcElementPosition(obninsk_box);

                let helper_line = createLineElement("helper_line",
                    vinoska_center,
                    obninsk_center,
                    false,
                    1,
                    "#606060"
                );
                render(svgElement, helper_line);
            }

            if (doDrawCircles) {
                drawCircles(drawData, svgElement);
            }

            if (doDrawNumbers) {
                drawNumbers(drawData, svgElement);
            }

            setCurrentData(drawData);
        }
        ,
        [data]
    );

    return (children);
}

function createTextElement(regionId, regionRectCenter, count) {
    let textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("id", regionId + "_circle");
    textElement.setAttribute("x", regionRectCenter.x);
    textElement.setAttribute("y", regionRectCenter.y);
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("alignment-baseline", "central");
    textElement.setAttribute("font-size", count + 10);
    textElement.setAttribute("fill", "#ffffff");
    // textElement.setAttribute("r", 5 + count);
    textElement.classList.add("rendered");

    let theText = document.createTextNode(count);
    textElement.appendChild(theText);
    return textElement;
}

function drawNumbers(drawData, root) {
    for (const obj of drawData) {
        let regionId = obj.id;
        let count = obj.count;

        let regionElement = root.getElementById(regionId);
        if (regionElement != null) {
            let regionRect = regionElement.getBBox();

            let regionRectCenter = calcElementPosition(regionRect, regionId);

            let textElement = createTextElement(regionId, regionRectCenter, count);

            render(root, textElement)
        }
    }
}

function createCircleElement(regionId, regionRectCenter, count) {
    let circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleElement.setAttribute("id", regionId + "_circle");
    circleElement.setAttribute("cx", regionRectCenter.x);
    circleElement.setAttribute("cy", regionRectCenter.y);
    circleElement.setAttribute("r", 5 + count);
    circleElement.setAttribute("fill", "#3892f6");
    circleElement.classList.add("rendered");
    return circleElement;
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
        regionRectCenter.x += 65;
        regionRectCenter.y -= 40;
    }

    return regionRectCenter;
}

function drawCircles(drawData, root) {
    for (const obj of drawData) {
        let regionId = obj.id;
        let count = obj.count;

        let regionElement = root.getElementById(regionId);
        if (regionElement != null) {
            let regionRect = regionElement.getBBox();

            let regionRectCenter = calcElementPosition(regionRect, regionId);

            let circleElement = createCircleElement(regionId, regionRectCenter, count);

            render(root, circleElement);
        }
    }
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

function render(root, element) {
    // let render_before = root.getElementById("outline_layer");
    // root.insertBefore(element, render_before);
    root.append(element)
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

                render(root, lineElement);
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
