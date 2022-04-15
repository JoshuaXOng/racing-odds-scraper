package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.components.ItemTile;

public class HomePage extends Scene {
  public HomePage() {
    super(new VBox(20), 1280, 720);
    ((VBox) this.getRoot()).setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    ((VBox) this.getRoot()).getStyleClass().add("home-page");

    ItemTile seachForSitesTile = new ItemTile("Search for Testing Sites");
    seachForSitesTile.setOnMouseClicked(
        e -> {
          DataStore.mainStage.setScene(new TestingSitesPage());
        });
    ((VBox) this.getRoot()).getChildren().add(seachForSitesTile);

    ItemTile homeBookingTile = new ItemTile("Home Booking");
    homeBookingTile.setOnMouseClicked(
        e -> {
          DataStore.mainStage.setScene(new HomeBookingPage());
        });
    ((VBox) this.getRoot()).getChildren().add(homeBookingTile);

    ItemTile onsiteBookingTile = new ItemTile("On-site Booking");
    onsiteBookingTile.setOnMouseClicked(
        e -> {
          DataStore.mainStage.setScene(new OnsiteBookingPage());
        });
    ((VBox) this.getRoot()).getChildren().add(onsiteBookingTile);

    ItemTile onsiteTestingTile = new ItemTile("On-site Testing");
    onsiteTestingTile.setOnMouseClicked(
        e -> {
          DataStore.mainStage.setScene(new OnsiteTestingPage());
        });
    ((VBox) this.getRoot()).getChildren().add(onsiteTestingTile);
  }
}
