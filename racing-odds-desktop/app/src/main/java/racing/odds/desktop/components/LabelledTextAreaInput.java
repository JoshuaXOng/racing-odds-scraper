package racing.odds.desktop.components;

import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.layout.VBox;

public class LabelledTextAreaInput extends VBox {
  public LabelledTextAreaInput(String labelText, String placeholderText, Consumer<String> onChange) {
    super(5);
    this.setMaxWidth(300);
    this.setAlignment(Pos.TOP_LEFT);
    
    Label label = new Label(labelText);
    this.getChildren().add(label);

    TextArea field = new TextArea();
    field.setPromptText(placeholderText);
    field.setOnKeyTyped(
        e -> {
          onChange.accept(field.textProperty().getValue());
        });
    this.getChildren().add(field);
  }
}
