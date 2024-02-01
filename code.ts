figma.showUI(__html__);

figma.ui.onmessage = async(pluginMessage) => {
  await figma.loadFontAsync({family:"Inter", style:"Bold"});
  const nodes:SceneNode[] = [];

  const cardComponent = figma.root.findOne(node => node.type == "COMPONENT" && node.name == "pokemon-card") as ComponentNode;
  const newCard = cardComponent.createInstance();

  const cardTemplateSprite = newCard.findOne(node => node.type == "FRAME" && node.name == "pokemon-sprite") as ComponentNode;
  const cardTemplateName = newCard.findOne(node => node.type == "TEXT" && node.name == "pokemon-name") as TextNode;
  cardTemplateName.characters = pluginMessage.name;

  spriteFetch(pluginMessage.sprite, cardTemplateSprite);

  nodes.push(newCard);
  figma.viewport.scrollAndZoomIntoView(nodes);
}

const spriteFetch = (sprite: string, spriteContainer: ComponentNode) => {
  figma.createImageAsync(
    sprite
  ).then(async (image: Image) => {

    spriteContainer.fills = [
      {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL'
      }
    ]

    figma.closePlugin()
  }).catch((error: any) => {
    console.log(error)
    figma.closePlugin()
  })
}