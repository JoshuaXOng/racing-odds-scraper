package racing.odds.desktop.pages;

import javafx.geometry.Orientation;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.FlowPane;
import javafx.scene.shape.Rectangle;
import racing.odds.desktop.DataStore;

public class JavaFXDemoPage extends Scene {
  public JavaFXDemoPage() {
    super(new FlowPane(Orientation.VERTICAL), 1280, 920);
    ((FlowPane) this.getRoot()).setHgap(20);
    ((FlowPane) this.getRoot()).setVgap(20);

    this.getStylesheets().add("css/jxo-custom.css");
    this.getStylesheets().add("css/jfoenix-components.css");

    Label label =
        new Label(
            "Hello, JavaFX "
                + System.getProperty("javafx.version")
                + ", running on Java "
                + System.getProperty("java.version")
                + ".");

    Rectangle box = new Rectangle(100, 100);
    box.setLayoutX(50);
    box.setLayoutY(50);
    box.getStyleClass().add("my-rect");

    Button button = new Button("Default Button");
    button.setOnMouseReleased(e -> DataStore.mainStage.setScene(new JFoenixDemoPage()));

    ((FlowPane) this.getRoot()).getChildren().add(label);
    ((FlowPane) this.getRoot()).getChildren().add(box);
    ((FlowPane) this.getRoot()).getChildren().add(button);
  }
}
