package racing.odds.desktop.components;

import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

public class ItemTile extends VBox {
  public ItemTile(String titleText) {
    super();
    this.setMaxWidth(200);
    this.getStyleClass().add("item-tile");

    Text title = new Text(titleText);
    title.getStyleClass().add("item-tile__title");
    this.getChildren().add(title);
  }
}
