import React, {useEffect, useState} from "react";

function PrettyMap({data, childId, children}) {
    const [currentLines, setCurrentLines] = useState([]);

    let animation = true

    useEffect(() => {
        const svg_root = document.getElementById(childId)
        let kaluga = document.getElementById("kl_25")
        let kaluga_rect = kaluga.getBBox()

        let all = []
        for (const [row_id, row_data] of Object.entries(data)) {
            console.log(row_data['count'])
            if (row_data['count'] !== 0) {
                all.push({id: row_data['id'], count: row_data['count']})
            }
        }

        let to_add = []
        for (const elem of all) {
            let flag = false
            for (const old_elem of currentLines) {
                if (elem.id === old_elem.id) {
                    flag = true
                    break
                }
            }
            if (!flag)
                to_add.push(elem)
        }

        let to_remove = []
        for (const old_elem of currentLines) {
            let flag = false
            for (const elem of all) {
                if (old_elem.id === elem.id) {
                    flag = true
                    break
                }
            }
            if (!flag) {
                to_remove.push(old_elem)
            }
        }


        for (const obj of to_add) {
            let district_id = obj.id
            let count = obj.count

            let district_object = document.getElementById(district_id);
            if (district_object != null && district_id !== "kl_25" && count !== 0) {
                let district_rect = district_object.getBBox()

                let lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line")
                // s.setAttribute('dominant-baseline', 'middle')
                lineElement.setAttribute('id', district_id + '_line')
                console.log(district_id + '_line')
                lineElement.setAttribute('stroke', '#176dea')
                lineElement.setAttribute('x1', district_rect.x + district_rect.width / 2)
                lineElement.setAttribute('y1', district_rect.y + district_rect.height / 2)
                lineElement.setAttribute('x2', kaluga_rect.x + kaluga_rect.width / 2)
                lineElement.setAttribute('y2', kaluga_rect.y + kaluga_rect.height / 2)

                // let animation = false


                if (animation) {
                    lineElement.setAttribute('stroke-dasharray', '40 10')
                    // lineElement.setAttribute('stroke-dasharray', '300 600')

                    let anim = document.createElementNS("http://www.w3.org/2000/svg", "animate")
                    anim.setAttribute('id', district_id + '_anim')

                    anim.setAttribute('attributeName', 'stroke-dashoffset')
                    anim.setAttribute('values', '100%; 0%')
                    anim.setAttribute('dur', '100s')
                    // anim.setAttribute('dur', '10s')
                    anim.setAttribute('repeatCount', 'indefinite')
                    anim.setAttribute('fill', 'freeze')
                    lineElement.append(anim)

                }
                svg_root.append(lineElement)
            } else {
                // let district_rect = district_object.getBBox()
            }
        }

        for (const obj of to_remove) {
            let line = document.getElementById(obj.id + '_line')
            line.remove()
        }

        setCurrentLines(all)
    }, [data])

    return (
        <>
            {children}
        </>
    );
}

export default PrettyMap;
