"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
figma.ui.onmessage = (pluginMessage) => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Inter", style: "Bold" });
    const nodes = [];
    const cardComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "pokemon-card");
    const newCard = cardComponent.createInstance();
    const cardTemplateSprite = newCard.findOne(node => node.type == "FRAME" && node.name == "pokemon-sprite");
    const cardTemplateName = newCard.findOne(node => node.type == "TEXT" && node.name == "pokemon-name");
    cardTemplateName.characters = pluginMessage.name;
    spriteFetch(pluginMessage.sprite, cardTemplateSprite);
    nodes.push(newCard);
    figma.viewport.scrollAndZoomIntoView(nodes);
});
const spriteFetch = (sprite, spriteContainer) => {
    figma.createImageAsync(sprite).then((image) => __awaiter(void 0, void 0, void 0, function* () {
        spriteContainer.fills = [
            {
                type: 'IMAGE',
                imageHash: image.hash,
                scaleMode: 'FILL'
            }
        ];
        figma.closePlugin();
    })).catch((error) => {
        console.log(error);
        figma.closePlugin();
    });
};
