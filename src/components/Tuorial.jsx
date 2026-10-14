import { Text, View, StyleSheet } from "react-native";
function getTutorial(id){
  return {
    id, usuarioID: id,
    title: id,
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget imperdiet justo. Nunc sed ligula magna. Vestibulum in maximus ligula, sed dignissim justo. Nulla lobortis leo ut cursus lacinia. Morbi lobortis tortor vel arcu tempor, non bibendum nulla mollis. Vestibulum id interdum orci. Nulla vitae lobortis odio. Aenean rhoncus felis nisl, eu porttitor diam maximus a. Nunc ligula tortor, consequat ut efficitur id, egestas non enim. Pellentesque accumsan nec enim ut vehicula. Pellentesque vel eleifend diam. Quisque quis aliquet magna, non tincidunt quam. Nunc posuere dignissim nisl eu cursus. Etiam ullamcorper hendrerit feugiat.

      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut volutpat imperdiet eros, ut molestie sapien dictum non. Pellentesque posuere gravida elit, a tincidunt leo maximus ac. Donec molestie accumsan ultricies. Mauris nec libero vitae tellus tristique tristique. Cras fermentum tristique gravida. Sed cursus bibendum ante, a sollicitudin dui pulvinar eget.

      Aliquam malesuada fermentum ligula pellentesque congue. Mauris luctus, ex ac volutpat ullamcorper, lorem odio lacinia lacus, id tempor dui metus id elit. Morbi id posuere est. Donec ut rutrum elit. Nunc ut urna luctus, efficitur dui eget, sagittis augue. In sed porta est, nec consectetur turpis. Fusce tincidunt, lectus id aliquet ultricies, dolor leo consectetur erat, eu tincidunt nunc lacus non tortor. Sed accumsan rhoncus eleifend. Suspendisse dapibus sollicitudin metus, sit amet faucibus leo mattis sit amet.

      Nullam vestibulum eleifend libero tristique convallis. Vestibulum mi felis, hendrerit ac lectus in, interdum viverra orci. Donec facilisis augue a neque semper, in consequat nisi ornare. Vivamus scelerisque mi ligula, in placerat arcu tincidunt non. Vestibulum molestie ligula turpis, at convallis sapien lobortis eget. Nunc vehicula tellus erat, a imperdiet ex convallis ac. Phasellus vestibulum nunc metus, vitae egestas ligula suscipit in. Quisque accumsan eros eget turpis finibus semper. Donec euismod dolor a facilisis eleifend.

      Ut at velit luctus odio luctus posuere. Sed vitae diam rutrum massa fringilla fermentum at dignissim est. Vivamus justo sapien, accumsan sit amet lacinia ut, dapibus eget ante. Cras blandit ornare quam, ac consectetur justo suscipit in. Donec ut eros nec lectus commodo fringilla. Vivamus sit amet est quis risus posuere scelerisque. Integer pharetra fermentum lectus. Donec varius sit amet ligula sed placerat. Quisque id risus in ex faucibus porttitor. Curabitur et tempus lectus, id volutpat augue. 
    `
  }
}
export default function Tutorial({id}) {
  const t = getTutorial(id)

  return (
    <View>
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.author}>Por {t.usuarioID}</Text>
      <Text style={styles.content}>{t.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  author: {
    fontSize: 10,
    fontStyle: "italic"
  },
  content: {

  }
});
