package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;

public class HomeBookingPage extends VBox {
  public HomeBookingPage() {
    super(20);
    this.setAlignment(Pos.TOP_LEFT);
    this.getStyleClass().add("home-booking-page");
  }
}
