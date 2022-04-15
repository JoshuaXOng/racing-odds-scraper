package racing.odds.desktop.components;

import javafx.scene.control.Button;
import javafx.scene.layout.HBox;
import racing.odds.desktop.DataStore;

public class HorizontalNavbar extends HBox {
  public HorizontalNavbar() {
    super();
    
    Button backButton = new Button("Back");
    backButton.setOnMouseClicked(e -> { DataStore.popScene(); });
    this.getChildren().add(backButton);
  }
}
