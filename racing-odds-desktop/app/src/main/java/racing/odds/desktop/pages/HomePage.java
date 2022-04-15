package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.components.ItemTile;

public class HomePage extends VBox {
  public HomePage() {
    super(20);
    this.setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    this.getStyleClass().add("home-page");

    ItemTile seachForSitesTile = new ItemTile("Search for Testing Sites");
    seachForSitesTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new TestingSitesPage());
        });
    this.getChildren().add(seachForSitesTile);

    ItemTile homeBookingTile = new ItemTile("Home Booking");
    homeBookingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new HomeBookingPage());
        });
    this.getChildren().add(homeBookingTile);

    ItemTile onsiteBookingTile = new ItemTile("On-site Booking");
    onsiteBookingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new OnsiteBookingPage());
        });
    this.getChildren().add(onsiteBookingTile);

    ItemTile onsiteTestingTile = new ItemTile("On-site Testing");
    onsiteTestingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new OnsiteTestingPage());
        });
    this.getChildren().add(onsiteTestingTile);
  }
}
