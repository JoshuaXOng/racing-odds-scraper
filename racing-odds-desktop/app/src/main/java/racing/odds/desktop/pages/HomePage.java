package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.GridPane;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.components.ItemTile;

public class HomePage extends GridPane {
  public HomePage() {
    super();
    this.setAlignment(Pos.CENTER);
    this.setVgap(40);
    this.getStyleClass().add("home-page");

    ItemTile seachForSitesTile = new ItemTile("Search for Testing Sites");
    seachForSitesTile.setPrefWidth(500);
    seachForSitesTile.setPrefHeight(50);
    seachForSitesTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new TestingSitesPage());
        });
    this.add(seachForSitesTile, 0, 0);

    ItemTile homeBookingTile = new ItemTile("Home Booking");
    homeBookingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new HomeBookingPage());
        });
    homeBookingTile.setPrefWidth(500);
    homeBookingTile.setPrefHeight(50);
    this.add(homeBookingTile, 0, 1);

    ItemTile onsiteBookingTile = new ItemTile("On-site Booking");
    onsiteBookingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new OnsiteBookingPage());
        });
    onsiteBookingTile.setPrefWidth(500);
    onsiteBookingTile.setPrefHeight(50);
    this.add(onsiteBookingTile, 0, 2);

    ItemTile onsiteTestingTile = new ItemTile("On-site Testing");
    onsiteTestingTile.setOnMouseClicked(
        e -> {
          DataStore.pushPage(new OnsiteTestingPage());
        }); 
    onsiteTestingTile.setPrefWidth(500);
    onsiteTestingTile.setPrefHeight(50);
    this.add(onsiteTestingTile, 0, 3);
  }
}
