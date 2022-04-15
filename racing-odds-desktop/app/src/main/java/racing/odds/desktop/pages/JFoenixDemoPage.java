package racing.odds.desktop.pages;

import com.jfoenix.controls.JFXButton;
import com.jfoenix.controls.JFXToggleButton;
import javafx.scene.Scene;
import javafx.scene.layout.FlowPane;
import racing.odds.desktop.DataStore;

public class JFoenixDemoPage extends Scene {
  public JFoenixDemoPage() {
    super(new FlowPane(), 1280, 720);
    ((FlowPane) this.getRoot()).setHgap(20);
    ((FlowPane) this.getRoot()).setVgap(20);

    this.getStylesheets().add("css/jxo-custom.css");
    this.getStylesheets().add("css/jfoenix-components.css");

    JFXButton button = new JFXButton("Raised JFX Button");
    button.getStyleClass().add("button-raised");
    button.setOnMouseReleased(e -> DataStore.pushScene(new JavaFXDemoPage()));

    JFXToggleButton toggleButton = new JFXToggleButton();
    toggleButton.setText("JFX Toggle Button");

    ((FlowPane) this.getRoot()).getChildren().add(button);
    ((FlowPane) this.getRoot()).getChildren().add(toggleButton);
  }
}
