// Format IDs:
// Skin: 'skin'
// Image: 'image'

(async function() {

    // Global variables
    let aboutAction
    let textLength, textGroup

    // Plugin information variables
    const id = "mc_text_generator"
    const name = "Minecraft Text Generator"
    const icon = "text_format"
    const author = "SirJain"

    // Links used in about dialog
    const links = {
        twitter: "https://twitter.com/SirJain2",
        discord: "https://discord.gg/wM4CKTbFVN"
    }

    // Register the plugin
    Plugin.register(id, {
        title: name,
        icon,
        author,
        description: "Generates Minecraft-styled text in cubes.",
        about: "This plugin adds a button under the `Tools` menu that allows you to generate Minecraft-like text.\n## How to use\nTo use this plugin, go to `Tools > Generate Text`. Simply enter some text, configure your settings how you like, and press `Generate`!\n\nPlease report any bugs or suggestions you may have.",
        tags: ["Minecraft", "Font", "Generator"],
        version: "1.0.0",
        min_version: "4.0.0",
        variant: "both",

        oninstall: () => showAbout(true),
        onload() {
            addAboutButton()

            // Define the dialog
            const generateTextDialog = new Blockbench.Dialog({
                name: "Generate Text",
                icon: icon,
                buttons: ["Generate", "Cancel"],
                form: {
                    input: {
                        label: "Enter Text",
                        type: "text",
                        value: "",
                        description: "Blockbench will take this and generate 3D text."
                    },
                    divider: "_",
                    letterSpace: {
                        label: "Letter Spacing",
                        type: "number",
                        min: 0,
                        value: 0.3,
                        description: "The amount of space between letters."
                    },
                    wordSpace: {
                        label: "Word Spacing",
                        type: "number",
                        value: 1,
                        min: 0,
                        description: "The amount of space between words."
                    },
                    depth: {
                        label: "Depth",
                        type: "number",
                        min: 0,
                        value: 2,
                        max: 8,
                        description: "The thickness of the letters. If 0, the letters will appear flat."
                    },
                    checkboxSpacer: "_",
                    javaCheckbox: {
                        label: "Show Java Block/Item Warnings",
                        type: "checkbox",
                        value: "true",
                        description: "If enabled, Blockbench will show an error box if text exceeds the 48x48x48 pixel limit in the Java Block/Item format. It is highly recommended to leave this on."
                    },
                    bedrockCheckbox: {
                        label: "Show Bedrock Block Warnings",
                        type: "checkbox",
                        value: "true",
                        description: "If enabled, Blockbench will show an error box if text exceeds the 30x30x30 pixel limit in the Bedrock Block format. It is highly recommended to leave this on."
                    }
                },
    
                onConfirm(formData) {

                    // Check - Did the user leave fields blank?
                    if (formData.input == "") {
                        Blockbench.showMessageBox({
                            title: "No valid text",
                            message: "Make sure you don't leave the field blank."
                        })

                        generateTextDialog.hide()
                    } 
                    
                    // Run if everything is okay
                    else {
                        Blockbench.showQuickMessage("Generated text!")
                        generateTextDialog.hide()
                        
                        // Character maps - each array in the 'cubes' component represents a cube.
                        const charMap = {
                            a: {
                                width: 6,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 4, 8, formData.depth],
                                    [4, 0, 0, 6, 8, formData.depth],
                                    [2, 3, 0, 4, 5, formData.depth]
                                ]
                            },
                            c: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 5, 8, formData.depth],
                                    [2, 0, 0, 5, 2, formData.depth]
                                ]
                            },
                            d: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 0, 0, 4, 2, formData.depth],
                                    [2, 6, 0, 4, 8, formData.depth],
                                    [3, 2, 0, 4, 6, formData.depth],
                                    [4, 1, 0, 5, 7, formData.depth],
                                ]
                            },
                            e: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 5, 8, formData.depth],
                                    [2, 3, 0, 4, 5, formData.depth],
                                    [2, 0, 0, 5, 2, formData.depth]
                                ]
                            },
                            f: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 5, 8, formData.depth],
                                    [2, 3, 0, 4, 5, formData.depth]
                                ]
                            },
                            g: {
                                width: 5,
                                cubes: [
                                    [0, 2, 0, 2, 8, formData.depth],
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [3, 2, 0, 5, 4, formData.depth],
                                    [2, 6, 0, 5, 8, formData.depth],
                                ]
                            },
                            h: {
                                width: 7,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [5, 0, 0, 7, 8, formData.depth],
                                    [2, 3, 0, 5, 5, formData.depth]
                                ]
                            },
                            i: {
                                width: 2,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth]
                                ]
                            },
                            j: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [3, 2, 0, 5, 8, formData.depth],
                                    [1, 6, 0, 3, 8, formData.depth]
                                ]
                            },
                            k: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 2.5, 0, 3, 5.5, formData.depth],
                                    [3, 0, 0, 4, 8, formData.depth],
                                    [4, 5, 0, 5, 8, formData.depth],
                                    [4, 0, 0, 5, 3, formData.depth],
                                ]
                            },
                            l: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 0, 0, 5, 2, formData.depth]
                                ]
                            },
                            m: {
                                width: 7,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 4, 0, 3, 7, formData.depth],
                                    [3, 3, 0, 4, 6, formData.depth],
                                    [4, 4, 0, 5, 7, formData.depth],
                                    [5, 0, 0, 7, 8, formData.depth],
                                ]
                            },
                            n: {
                                width: 6,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [4, 0, 0, 6, 8, formData.depth],
                                    [2, 3.5, 0, 3, 6.5, formData.depth],
                                    [3, 2.5, 0, 4, 5.5, formData.depth],
                                    [4, 0, 0, 6, 8, formData.depth],
                                ]
                            },
                            o: {
                                width: 6,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 4, 8, formData.depth],
                                    [4, 0, 0, 6, 8, formData.depth],
                                    [2, 0, 0, 4, 2, formData.depth]
                                ]
                            },
                            p: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [3, 3, 0, 5, 8, formData.depth],
                                    [2, 6, 0, 3, 8, formData.depth],
                                    [2, 3, 0, 3, 5, formData.depth],
                                ]
                            },
                            u: {
                                width: 6,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [4, 0, 0, 6, 8, formData.depth],
                                    [2, 0, 0, 4, 2, formData.depth]
                                ]
                            },
                            0: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [2, 6, 0, 3, 8, formData.depth],
                                    [3, 0, 0, 5, 8, formData.depth],
                                    [2, 0, 0, 3, 2, formData.depth]
                                ]
                            },
                            1: {
                                width: 3,
                                cubes: [
                                    [0, 5, 0, 1, 7, formData.depth],
                                    [1, 0, 0, 3, 8, formData.depth],
                                ]
                            },
                            2: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [0, 3, 0, 5, 5, formData.depth],
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [0, 2, 0, 2, 3, formData.depth],
                                    [3, 5, 0, 5, 6, formData.depth],
                                ]
                            },
                            3: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [0, 3, 0, 5, 5, formData.depth],
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [3, 2, 0, 5, 3, formData.depth],
                                    [3, 5, 0, 5, 6, formData.depth],
                                ]
                            },
                            4: {
                                width: 5,
                                cubes: [
                                    [0, 3, 0, 2, 8, formData.depth],
                                    [2, 3, 0, 3, 5, formData.depth],
                                    [3, 0, 0, 5, 8, formData.depth],
                                ]
                            },
                            5: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [0, 3, 0, 5, 5, formData.depth],
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [3, 2, 0, 5, 3, formData.depth],
                                    [0, 5, 0, 2, 6, formData.depth],
                                ]
                            },
                            6: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 5, 2, formData.depth],
                                    [0, 3, 0, 5, 5, formData.depth],
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [3, 2, 0, 5, 3, formData.depth],
                                    [0, 2, 0, 2, 3, formData.depth],
                                    [0, 5, 0, 2, 6, formData.depth],
                                ]
                            },
                            7: {
                                width: 5,
                                cubes: [
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [3, 0, 0, 5, 6, formData.depth],
                                ]
                            },
                            8: {
                                width: 5,
                                cubes: [
                                    [0, 0, 0, 2, 8, formData.depth],
                                    [3, 0, 0, 5, 8, formData.depth],
                                    [2, 6, 0, 3, 8, formData.depth],
                                    [2, 0, 0, 3, 2, formData.depth],
                                    [2, 3, 0, 3, 5, formData.depth],
                                ]
                            },
                            9: {
                                width: 5,
                                cubes: [
                                    [0, 6, 0, 5, 8, formData.depth],
                                    [0, 3, 0, 3, 5, formData.depth],
                                    [0, 0, 0, 3, 2, formData.depth],
                                    [0, 5, 0, 2, 6, formData.depth],
                                    [3, 0, 0, 5, 6, formData.depth],
                                ]
                            },
                            ".": {
                                width: 3,
                                cubes: [
                                    [0, 0, 0, 2, 2, formData.depth]
                                ]
                            },
                            "!": {
                                width: 2,
                                cubes: [
                                    [0, 0, 0, 2, 2, formData.depth],
                                    [0, 4, 0, 2, 8, formData.depth]
                                ]
                            },
                            "-": {
                                width: 4,
                                cubes: [
                                    [0, 3, 0, 4, 5, formData.depth]
                                ]
                            },
                            ":": {
                                width: 2,
                                cubes: [
                                    [0, 0, 0, 2, 2, formData.depth],
                                    [0, 4, 0, 2, 6, formData.depth]
                                ]
                            },
                            ";": {
                                width: 2,
                                cubes: [
                                    [0, 4, 0, 2, 6, formData.depth],
                                    [0, -1, 0, 2, 2, formData.depth]
                                ]
                            },
                            ",": {
                                width: 2,
                                cubes: [
                                    [0, -1, 0, 2, 2, formData.depth]
                                ]
                            },
                            "'": {
                                width: 2,
                                cubes: [
                                    [0, 6, 0, 2, 9, formData.depth]
                                ]
                            },
                            "?": {
                                width: 4,
                                cubes: [
                                    [1, 0, 0, 3, 2, formData.depth],
                                    [1, 3, 0, 3, 5, formData.depth],
                                    [0, 6, 0, 4, 8, formData.depth],
                                    [2, 5, 0, 4, 6, formData.depth]
                                ]
                            },
                            " ": {
                                width: formData.wordSpace,
                                cubes: []
                            },
                        }
                        
                        let offset = 0
                        let textCube
                        textLength = 0
    
                        Undo.initEdit({outliner: true, elements: [], group: textGroup, selection: true});
                        textGroup = new Group('text_' + formData.input).init()

                        for (const char of formData.input.toLowerCase()) {

                            // Check for an invalid character
                            if (!charMap.hasOwnProperty(char)) {
                                console.log(char)
                                continue
                            }

                            // Generate cubes based on letter
                            for (const cube of charMap[char].cubes) {
                                textCube = new Cube({
                                    name: "text_" + formData.input,
                                    from: [cube[0] + offset, cube[1], cube[2]],
                                    to: [cube[3] + offset, cube[4], cube[5]]
                                }).addTo(textGroup).init()

                                textCube.flip(0, 2.0, true)
                            }

                            offset += charMap[char].width + formData.letterSpace
                            textLength = textLength + charMap[char].width + formData.letterSpace
                        }
                        
                        formatText()
                        Undo.finishEdit('Generated Text', {outliner: true, elements: selected, selection: true, group: textGroup});
                    }

                    // Format checks
                    if (
                        Format?.id === "java_block" && 
                        formData.javaCheckbox == true && 
                        textLength - formData.letterSpace >= 48
                    ) showRestrictionWarning("48x48x48")

                    if (
                        Format?.id === "bedrock_block" && 
                        formData.bedrockCheckbox == true && 
                        textLength - formData.letterSpace >= 30
                    ) showRestrictionWarning("30x30x30")
                }
            })

            const textAction = new Action({
                id: "generate_text_action",
                name: "Generate Text",
                icon: icon,
                description: "Input some text and let Blockbench generate the letters.",
                click: () => generateTextDialog.show()
            })

            MenuBar.addAction(textAction, "tools")
        },
        onunload() {
            Blockbench.showQuickMessage("Uninstalled " + name, 2000)
            aboutAction.delete()
            MenuBar.removeAction(`help.about_plugins.about_${id}`)
            MenuBar.removeAction("tools.generate_text_action")
        }
    })

    // Helper function that formats text
    function formatText() {
        textGroup.openUp().select()
        Group.selected.origin[0] = textLength / 2 - 4
        Canvas.updateView({groups: [Group.selected]})
    }

    // Add about button
    function addAboutButton() {
        let about = MenuBar.menus.help.structure.find(e => e.id === "about_plugins")

        if (!about) {
            about = new Action("about_plugins", {
                name: "About Plugins...",
                icon: "info",
                children: []
            })

            MenuBar.addAction(about, "help")
        }

        aboutAction = new Action(`about_${id}`, {
            name: `About ${name}...`,
            icon,
            click: () => showAbout()
        })

        about.children.push(aboutAction)
    }

    // Show a message box if the format has size restrictions
    function showRestrictionWarning(units) {
        Blockbench.showMessageBox({
            title: "Possible format restrictions",
            message: "<b>Warning:</b> The format you are in restricts all models to " + units + " units. If your generated text exceeds that limit, it may look distorted.<br><br><b>Note:</b> Your text has still been generated."
        })
    }

    // Show about dialog
    function showAbout(banner) {
        const infoBox = new Dialog({
            id: "about",
            title: name,
            width: 780,
            buttons: [],
            lines: [`
                <style>
                    dialog#about .dialog_title {
                        padding-left: 0;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    dialog#about .dialog_content {
                        text-align: left!important;
                        margin: 0!important;
                    }

                    dialog#about .socials {
                        padding: 0!important;
                    }

                    dialog#about #banner {
                        background-color: var(--color-accent);
                        color: var(--color-accent_text);
                        width: 100%;
                        padding: 0 8px
                    }
                    
                    dialog#about #content {
                        margin: 24px;
                    }
                </style>
                ${banner ? `<div id="banner">This window can be reopened at any time from <strong>Help > About Plugins > ${name}</strong></div>` : ""}
                <div id="content">
                    <h1 style="margin-top:-10px">${name}</h1>
                    <p>Generates Minecraft-styled text in cubes.</p>
					<h4>Worth noting:</h4>
					<p>- Some formats may break the look of the text because of size restrictions.</p>
					<p>- Text generated by this plugin is NOT from official Minecraft font files, but simply a replica. Fonts may not be completely accurate to the original Minecraft font.</p>
					<h4>How to use:</h4>
					<p>To use this plugin, go to <b>Tools > Generate Text</b>. Simply enter some text, configure your settings how you like, and press <b>Generate</b>!</p>
					<br>
                    <div class="socials">
                        <a href="${links["twitter"]}" class="open-in-browser">
                            <i class="fa-brands fa-twitter" style="color:#1DA1F2"></i>
                            <label>By ${author}</label>
                        </a>
                        <a href="${links["discord"]}" class="open-in-browser">
                            <i class="fa-brands fa-discord" style="color:#5865F2"></i>
                            <label>Discord Server</label>
                        </a>
                    </div>
                </div>
            `]
        }).show()
        $("dialog#about .dialog_title").html(`
            <i class="icon material-icons">${icon}</i>
            ${name}
        `)
    }
})()