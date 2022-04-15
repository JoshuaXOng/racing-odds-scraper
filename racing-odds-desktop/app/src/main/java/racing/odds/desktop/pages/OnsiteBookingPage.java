package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import racing.odds.desktop.components.HorizontalNavbar;
import racing.odds.desktop.components.OnsiteBookingForm;

public class OnsiteBookingPage extends Scene {
  public OnsiteBookingPage() {
    super(new StackPane(), 1280, 720);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    
    VBox mainLayout = new VBox(20);
    mainLayout.setAlignment(Pos.TOP_LEFT);
    mainLayout.getStyleClass().add("on-site-booking-page");

    mainLayout.getChildren().add(new HorizontalNavbar());

    OnsiteBookingForm testBookingForm = new OnsiteBookingForm();
    mainLayout.getChildren().add(testBookingForm);
    
    ((StackPane) this.getRoot()).getChildren().add(mainLayout);
  }
}
