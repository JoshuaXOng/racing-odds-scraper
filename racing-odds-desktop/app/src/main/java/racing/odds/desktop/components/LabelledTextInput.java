package racing.odds.desktop.components;

import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;

public class LabelledTextInput extends VBox {
  public LabelledTextInput(String labelText, String placeholderText, Consumer<String> onChange) {
    super(5);
    this.setMaxWidth(300);
    this.setAlignment(Pos.CENTER_LEFT);

    Label label = new Label(labelText);
    this.getChildren().add(label);

    TextField field = new TextField();
    field.setPromptText(placeholderText);
    field.setOnKeyTyped(
        e -> {
          onChange.accept(field.textProperty().getValue());
        });
    this.getChildren().add(field);
  }
}
