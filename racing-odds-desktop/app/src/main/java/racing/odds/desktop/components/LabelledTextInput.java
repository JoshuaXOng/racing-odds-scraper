package racing.odds.desktop.components;

import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;

public class LabelledTextInput {
  public static VBox get(String labelText, String placeholderText, Consumer<String> onChange) {
    VBox container = new VBox(5);
    container.setMaxWidth(300);
    container.setAlignment(Pos.CENTER_LEFT);

    Label label = new Label(labelText);
    container.getChildren().add(label);

    TextField field = new TextField();
    field.setPromptText(placeholderText);
    field.setOnKeyTyped(
        e -> {
          onChange.accept(field.textProperty().getValue());
        });
    container.getChildren().add(field);

    return container;
  }
}
