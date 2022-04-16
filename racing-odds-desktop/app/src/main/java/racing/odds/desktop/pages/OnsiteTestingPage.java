package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import javafx.geometry.Pos;
import javafx.scene.layout.VBox;

import racing.odds.desktop.components.HorizontalNavbar;
import racing.odds.desktop.components.OnsiteBookingForm;
import racing.odds.desktop.components.OnsiteTestingForm;

public class OnsiteTestingPage extends VBox {
  public OnsiteTestingPage() {
    super(20);
    
    VBox mainLayout = new VBox(20);
    mainLayout.setAlignment(Pos.TOP_LEFT);
    mainLayout.getStyleClass().add("on-site-testing-page");

    mainLayout.getChildren().add(new HorizontalNavbar());

    OnsiteTestingForm onsiteTestingForm = new OnsiteTestingForm();
    mainLayout.getChildren().add(onsiteTestingForm);
    
    this.getChildren().add(mainLayout);
  }
}
