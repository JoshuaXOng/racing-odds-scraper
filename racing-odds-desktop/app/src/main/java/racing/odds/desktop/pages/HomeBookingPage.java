package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;

public class HomeBookingPage extends Scene {
  public HomeBookingPage() {
    super(new VBox(20), 1280, 720);
    ((VBox) this.getRoot()).setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    ((VBox) this.getRoot()).getStyleClass().add("home-booking-page");
  }
}
