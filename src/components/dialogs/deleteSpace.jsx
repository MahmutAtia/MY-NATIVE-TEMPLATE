<Dialog
overlayStyle={{ backgroundColor: "white" }}
isVisible={deleteDialogVisable}
onBackdropPress={() => setdeleteDialogVisable(false)}
>
<Dialog.Title title="hey" />
<Text className="text-black">
  Do you want to delete {item.name} space
</Text>
<Dialog.Actions>
  <Dialog.Button
    title="CONFIRM"
    onPress={() => {
      deleteSpace(item.id);
      setdeleteDialogVisable(false);
    }}
  />
  <Dialog.Button
    title="CANCEL"
    onPress={() => setdeleteDialogVisable(false)}
  />
</Dialog.Actions>
</Dialog>
</View>