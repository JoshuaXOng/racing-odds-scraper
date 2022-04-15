package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;

public class HomeBookingPage extends VBox {
  public HomeBookingPage() {
    super(20);
    this.setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    this.getStyleClass().add("home-booking-page");
  }
}
