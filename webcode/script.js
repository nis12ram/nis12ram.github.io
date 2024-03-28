// hanlding tab functionality


function __get_tab(e, numSpaces) {


    // console.log(this.value)
    if (e.key === 'Tab') {
        e.preventDefault()

        let start = e.target.selectionStart;
        let end = e.target.selectionEnd;
        // console.log(e.target.value)
        e.target.value = e.target.value.substring(0, start) + " ".repeat(numSpaces) + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + numSpaces;

    }

}

let __html_input = document.getElementById("__html_input");
let __css_input = document.getElementById("__css_input");
let __js_input = document.getElementById("__js_input");

// const keydownEventListener = (e,numSpaces) => {
//     console.log(e.key);
//     get_tab(e, numSpaces);
// };

function __keydownEventListener(e, numSpaces) {
    // console.log(e.key);
    __get_tab(e, numSpaces);

}

let __htmlKeydownListener = function (e) {
    __keydownEventListener(e, 2);
};

let __cssKeydownListener = function (e) {
    __keydownEventListener(e, 2);
};

let __jsKeydownListener = function (e) {
    __keydownEventListener(e, 2);
};

// Add event listeners using the named references
__html_input.addEventListener("keydown", __htmlKeydownListener);
__css_input.addEventListener("keydown", __cssKeydownListener);
__js_input.addEventListener("keydown", __jsKeydownListener);







let __base_container = document.getElementById("__output_box");

// hanlding html code from textarea
__html_input.addEventListener("keyup", (e) => {
    __base_container.innerHTML = e.target.value

})



// handling css code form text area 
let __userStyleHolder = document.getElementById('__userStyleHolder');

__css_input.addEventListener('keyup', (e) => {
    // userStyleHolder.textContent = e.target.value
    // console.log(userStyleHolder.textContent.split('\n'))
    let styleLines = e.target.value.split('\n');
    let updatedstyleLines = "";
    for (const styleLine of styleLines) {
        if ((styleLine.includes('body') && styleLine.includes('{')) && (!styleLine.includes(".body"))) {
            // console.log(styleLine)
            updatedstyleLines += `.__${styleLine}`

        } else if (styleLine.includes("{")) {
            // console.log(styleLine)
            updatedstyleLines += `#__output_box ${styleLine}`


        } else if (styleLine.includes("vw")) {
            // console.log(styleLine)
            // console.log(styleLine.replace("vw", "%"))
            // updatedstyleLines += styleLine.replace("vw", "%")
            const regex = /(\d*\.?\d+)\s*vw/;

            // Match the number using the regular expression
            const match = styleLine.match(regex);

            // Extract the number from the match
            const number = styleLine ? parseFloat(match[1]) : null;

            // console.log(number);
            // styleLine.replace("vw", "%")
            // styleLine.replace(number, number-2)
            // console.log(styleLine.replace("vw", "%"))
            updatedstyleLines += styleLine.replace(number, number - 5)

        }
        else {
            updatedstyleLines += styleLine
        }
        updatedstyleLines = `${updatedstyleLines}\n`



    }

    // console.log(userStyleHolder)

    __userStyleHolder.textContent = updatedstyleLines

    // console.log(styleLines[0])
})





// handling js code from textarea 
// let userJsHolder = document.getElementById('__userJsHolder');

// console.log(userJsHolder)
__js_input.addEventListener('keyup', (e) => {

    console.clear()
    let restrictedCommands = [
        'alert',
        'prompt',
        'confirm',
        'window',
        'body'
    ];



    try {

        for (const command of restrictedCommands) {
            if (e.target.value.includes(command)) {
                throw new Error(`server Js Error: Restricted command detected => ${command}. Execution blocked.`);

            }
        }

        eval(e.target.value)
    } catch (e) {
        // console.log(typeof (e.message))
        if (e.message.includes("server")) {
            console.error(e)

        } else {
            console.error(`Error: user Js Error: ${e}`)

        }
    }
})


// function add_cols_1(ele_to_add, base_ele, specific) {
//     let a = document.createElement("a")
//     a.setAttribute("class", "__pointer_cursor")
//     let id = `__${ele_to_add}_${specific}_cols1`
//     a.setAttribute("id", id)
//     let p = document.createElement("p")
//     p.textContent = ele_to_add
//     p.setAttribute("class", "__text_font ")
//     a.append(p)
//     base_ele.append(a)
// }



// handling html pop up window 

let __html_box_settings = document.getElementById("__html_box_settings");
let __html_sett_pop_up = document.getElementById("__html_sett_pop_up");
__html_box_settings.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log("html settings button is clicked")
    __html_sett_pop_up.classList.toggle("__none_display")

})

// handling inner style of the html pop up window 

// html editor user handling 

let __editor_html_cols1 = document.getElementById("__editor_html_cols1");
let __editor_html_cols2 = document.getElementById("__editor_html_cols2");


// console.log(editor_html_cols1)
__editor_html_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_html_cols2.classList)
    // if other setting is on then remove that 
    __internal_html_cols2.classList.add("__none_display")

    __editor_html_cols2.classList.toggle("__none_display")


})

// html internal user handling 


let __internal_html_cols1 = document.getElementById("__internal_html_cols1");
let __internal_html_cols2 = document.getElementById("__internal_html_cols2");
__internal_html_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_html_cols2.classList)

    // if other setting is on then remove that 
    __editor_html_cols2.classList.add("__none_display")

    __internal_html_cols2.classList.toggle("__none_display")


})


// setting html background color 
let __html_background_color_picker = document.querySelector("#__editor_html_cols2 .__background .__colorPicker")


__html_background_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __html_input.style.backgroundColor = __selected_color
})


// setting html text color 
let __html_text_color_picker = document.querySelector("#__editor_html_cols2 .__text .__colorPicker")


__html_text_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __html_input.style.color = __selected_color
})

// setting html text font 
let __html_text_font_size = document.querySelector("#__editor_html_cols2 .__f_size input")


__html_text_font_size.addEventListener('input', (e) => {

    __html_input.style.fontSize = `${e.target.value}px`
})

// setting html text family 
let __html_text_font_family = document.querySelector("#__editor_html_cols2 .__f_family input")


__html_text_font_family.addEventListener('input', (e) => {

    __html_input.style.fontFamily = e.target.value
})


// setting html indent number
let __html_text_indent_number = document.querySelector("#__editor_html_cols2 .__indent_size input")

console.log(__html_text_indent_number)
__html_text_indent_number.addEventListener('input', (e) => {

    __html_input.removeEventListener("keydown", __htmlKeydownListener);
    __htmlKeydownListener = function (inst) {
        __keydownEventListener(inst, e.target.value);
    };
    __html_input.addEventListener("keydown", __htmlKeydownListener)

    // get_tab(html_input, Number(e.target.value))
    console.log(e.target.value)
})

// console.log(" ".repeat(100) + "op")
// get_tab(html_input, Number(e.target.value))


// handling html popup close button 
let __html_popup_close_button = document.querySelector("#__html_popup_close button");
console.log(__html_popup_close_button)
__html_popup_close_button.addEventListener("click", (e) => {
    e.preventDefault()
    __html_sett_pop_up.classList.toggle("__none_display")

})







// handling css pop up window 

let __css_box_settings = document.getElementById("__css_box_settings");
let __css_sett_pop_up = document.getElementById("__css_sett_pop_up");
__css_box_settings.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log("html settings button is clicked")
    __css_sett_pop_up.classList.toggle("__none_display")

})


// css editor user handling 

let __editor_css_cols1 = document.getElementById("__editor_css_cols1");
let __editor_css_cols2 = document.getElementById("__editor_css_cols2");
// console.log(__editor_css_cols1)
__editor_css_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_css_cols2.classList)
    __internal_css_cols2.classList.add("__none_display")

    __editor_css_cols2.classList.toggle("__none_display")


})

// html internal user handling 


let __internal_css_cols1 = document.getElementById("__internal_css_cols1");
let __internal_css_cols2 = document.getElementById("__internal_css_cols2");
__internal_css_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_html_cols2.classList)

    // if other setting is on then remove that 
    __editor_css_cols2.classList.add("__none_display")

    __internal_css_cols2.classList.toggle("__none_display")


})

// setting css background color 
let __css_background_color_picker = document.querySelector("#__editor_css_cols2 .__background .__colorPicker")


__css_background_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __css_input.style.backgroundColor = __selected_color
})

// setting css text color 
let __css_text_color_picker = document.querySelector("#__editor_css_cols2 .__text .__colorPicker")


__css_text_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __css_input.style.color = __selected_color
})


// setting css text font 
let __css_text_font_size = document.querySelector("#__editor_css_cols2 .__f_size input")


__css_text_font_size.addEventListener('input', (e) => {

    __css_input.style.fontSize = `${e.target.value}px`
})

// setting css text family 
let __css_text_font_family = document.querySelector("#__editor_css_cols2 .__f_family input")


__css_text_font_family.addEventListener('input', (e) => {

    __css_input.style.fontFamily = e.target.value
})



// setting css indent number
let __css_text_indent_number = document.querySelector("#__editor_css_cols2 .__indent_size input")

console.log(__html_text_indent_number)
__css_text_indent_number.addEventListener('input', (e) => {

    __css_input.removeEventListener("keydown", __cssKeydownListener);
    __cssKeydownListener = function (inst) {
        __keydownEventListener(inst, e.target.value);
    };
    __css_input.addEventListener("keydown", __cssKeydownListener)

    // get_tab(html_input, Number(e.target.value))
    // console.log(e.target.value)
})


// handling css popup close button 
let __css_popup_close_button = document.querySelector("#__css_popup_close button");
// console.log(html_popup_close_button)
__css_popup_close_button.addEventListener("click", (e) => {
    e.preventDefault()
    __css_sett_pop_up.classList.toggle("__none_display")

})











// handling css pop up window 

let __js_box_settings = document.getElementById("__js_box_settings");
let __js_sett_pop_up = document.getElementById("__js_sett_pop_up");
__js_box_settings.addEventListener('click', (e) => {
    e.preventDefault()
    // console.log("js settings button is clicked")
    __js_sett_pop_up.classList.toggle("__none_display")

})


// css editor user handling 

let __editor_js_cols1 = document.getElementById("__editor_js_cols1");
let __editor_js_cols2 = document.getElementById("__editor_js_cols2");
console.log(__editor_js_cols1)
__editor_js_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_js_cols2.classList)
    __internal_js_cols2.classList.add("__none_display")

    __editor_js_cols2.classList.toggle("__none_display")


})


// html internal user handling 


let __internal_js_cols1 = document.getElementById("__internal_js_cols1");
let __internal_js_cols2 = document.getElementById("__internal_js_cols2");
__internal_js_cols1.addEventListener('click', (e) => {
    // console.log('editor is clicked')
    // console.log(__editor_html_cols2.classList)

    // if other setting is on then remove that 
    __editor_js_cols2.classList.add("__none_display")

    __internal_js_cols2.classList.toggle("__none_display")


})

// setting css background color 
let __js_background_color_picker = document.querySelector("#__editor_js_cols2 .__background .__colorPicker")


__js_background_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __js_input.style.backgroundColor = __selected_color
})

// setting css text color 
let __js_text_color_picker = document.querySelector("#__editor_js_cols2 .__text .__colorPicker")


__js_text_color_picker.addEventListener('input', (e) => {
    let __selected_color = e.target.value;
    __js_input.style.color = __selected_color
})


// setting css text font 
let __js_text_font_size = document.querySelector("#__editor_js_cols2 .__f_size input")


__js_text_font_size.addEventListener('input', (e) => {

    __js_input.style.fontSize = `${e.target.value}px`
})

// setting css text family 
let __js_text_font_family = document.querySelector("#__editor_js_cols2 .__f_family input")


__js_text_font_family.addEventListener('input', (e) => {

    __js_input.style.fontFamily = e.target.value
})



// setting css indent number
let __js_text_indent_number = document.querySelector("#__editor_js_cols2 .__indent_size input")

// console.log(__js_text_indent_number)
__js_text_indent_number.addEventListener('input', (e) => {

    __js_input.removeEventListener("keydown", __jsKeydownListener);
    __jsKeydownListener = function (inst) {
        __keydownEventListener(inst, e.target.value);
    };
    __js_input.addEventListener("keydown", __jsKeydownListener)

    // get_tab(html_input, Number(e.target.value))
    // console.log(e.target.value)
})


// handling css popup close button 
let __js_popup_close_button = document.querySelector("#__js_popup_close button");
// console.log(html_popup_close_button)
__js_popup_close_button.addEventListener("click", (e) => {
    e.preventDefault()
    __js_sett_pop_up.classList.toggle("__none_display")

})






// Get the output box element
const __outputBox = document.getElementById("__output_box");

// Check if the content height exceeds 45vh and adjust the height of the box accordingly
function __adjustBoxHeight() {
    const contentHeight = __outputBox.scrollHeight;
    const minHeight = __outputBox.clientHeight; // 45vh of the viewport height
    __outputBox.style.minHeight = Math.max(contentHeight, minHeight) + "px";
}

// Call the function when the page loads and when the window is resized
window.addEventListener("load", __adjustBoxHeight);
window.addEventListener("resize", __adjustBoxHeight);







// handling expand button functionality 
let __expand_btn = document.querySelector(".__expand_btn");
let __input_box = document.getElementsByClassName("__input_box");
let __isExpanded = false;




// setting the name expand_btn 

function updateContent(newContent) {
    __expand_btn.setAttribute('data-content', newContent);
}

updateContent("expand all") // initial value


__expand_btn.addEventListener("click", (e) => {

    console.log("expand_btn is clicked")
    if (window.innerWidth > 800) {
        if (__isExpanded == false) {
            __outputBox.style.minHeight = `${window.innerHeight * 0.95}px`
            for (const ele of __input_box) {
                ele.style.height = `${window.innerHeight * 0.85}px`
                // ele.style.width = '95%'

            }
            updateContent("squeeze all")
            __isExpanded = true
        }
        else if (__isExpanded == true) {
            __outputBox.style.minHeight = `${window.innerHeight * 0.45}px`
            for (const ele of __input_box) {
                ele.style.height = `${window.innerHeight * 0.43}px`
                // ele.style.width = '95%'

            }
            updateContent("expand all")
            __isExpanded = false


        }
    }

})

// let __a = 2;
// console.log(__a)



