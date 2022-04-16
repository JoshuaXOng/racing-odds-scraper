package racing.odds.desktop.pages;

import com.jfoenix.controls.JFXButton;
import com.jfoenix.controls.JFXToggleButton;
import javafx.scene.layout.VBox;

public class JFoenixDemoPage extends VBox {
  public JFoenixDemoPage() {
    super(20);
    
    JFXButton button = new JFXButton("Raised JFX Button");
    button.getStyleClass().add("button-raised");

    JFXToggleButton toggleButton = new JFXToggleButton();
    toggleButton.setText("JFX Toggle Button");

    this.getChildren().add(button);
    this.getChildren().add(toggleButton);
  }
}
