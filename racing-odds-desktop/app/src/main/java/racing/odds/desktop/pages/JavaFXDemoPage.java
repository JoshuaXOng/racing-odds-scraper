package racing.odds.desktop.pages;

import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.scene.shape.Rectangle;

public class JavaFXDemoPage extends VBox {
  public JavaFXDemoPage() {
    super(20);
    
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

    this.getChildren().add(label);
    this.getChildren().add(box);
    this.getChildren().add(button);
  }
}
