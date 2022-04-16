package racing.odds.desktop.components;

import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.effect.DropShadow;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;

public class Modal extends VBox {
  public Modal(String titleText, String bodyText, Runnable onCloseClick) {
    super();
    this.setAlignment(Pos.CENTER);
    this.getStyleClass().add("modal");

    VBox card = new VBox(30);
    card.setAlignment(Pos.TOP_LEFT);
    card.setMaxWidth(300);
    card.setMinHeight(300);
    card.setEffect(new DropShadow());
    card.getStyleClass().add("modal__card");

    HBox cardHeader = new HBox(10);
    cardHeader.setAlignment(Pos.CENTER_LEFT);

    Button closeButton = new Button("Close");
    closeButton.setOnMouseClicked(e -> onCloseClick.run());
    cardHeader.getChildren().add(closeButton);
    cardHeader.getChildren().add(new Text(titleText));
    card.getChildren().add(cardHeader);

    card.getChildren().add(new Text(bodyText));

    this.getChildren().add(card);
  }
}
