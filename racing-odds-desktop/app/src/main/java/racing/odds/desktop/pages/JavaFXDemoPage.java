package racing.odds.desktop.pages;

import javafx.geometry.Orientation;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.FlowPane;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class JavaFXDemoPage {
  public static Scene get(Stage stage) {
    FlowPane layout = new FlowPane(Orientation.VERTICAL);
    layout.setHgap(20);
    layout.setVgap(20);

    Scene scene = new Scene(layout, 1280, 920);
    scene.getStylesheets().add("css/jxo-custom.css");
    scene.getStylesheets().add("css/jfoenix-components.css");

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
    button.setOnMouseReleased(e -> stage.setScene(JFoenixDemoPage.get(stage)));

    ((FlowPane) scene.getRoot()).getChildren().add(label);
    ((FlowPane) scene.getRoot()).getChildren().add(box);
    ((FlowPane) scene.getRoot()).getChildren().add(button);

    return scene;
  }
}
