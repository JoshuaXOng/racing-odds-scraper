package racing.odds.desktop.pages;

import com.jfoenix.controls.JFXButton;
import com.jfoenix.controls.JFXToggleButton;
import javafx.scene.Scene;
import javafx.scene.layout.FlowPane;
import javafx.stage.Stage;

public class JFoenixDemoPage {
  public static Scene get(Stage stage) {
    FlowPane layout = new FlowPane();
    layout.setHgap(20);
    layout.setVgap(20);

    Scene scene = new Scene(layout, 1280, 720);
    scene.getStylesheets().add("css/jxo-custom.css");
    scene.getStylesheets().add("css/jfoenix-components.css");

    JFXButton button = new JFXButton("Raised JFX Button");
    button.getStyleClass().add("button-raised");
    button.setOnMouseReleased(e -> stage.setScene(JavaFXDemoPage.get(stage)));

    JFXToggleButton toggleButton = new JFXToggleButton();
    toggleButton.setText("JFX Toggle Button");

    ((FlowPane) scene.getRoot()).getChildren().add(button);
    ((FlowPane) scene.getRoot()).getChildren().add(toggleButton);

    return scene;
  }
}
