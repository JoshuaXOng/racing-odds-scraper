package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;

public class OnsiteTestingPage extends VBox {
  public OnsiteTestingPage() {
    super(20);
    this.setAlignment(Pos.TOP_LEFT);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    this.getStyleClass().add("on-site-testing-page");
  }
}
