package racing.odds.desktop.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

public class LabelledDropDownInput extends VBox {
  public LabelledDropDownInput(String labelText, Consumer<String> onChange) {
    super(5);
    this.setMaxWidth(300);
    this.setAlignment(Pos.CENTER_LEFT);

    Label label = new Label(labelText);
    this.getChildren().add(label);

    ChoiceBox<String> field = new ChoiceBox<>();
    field.getItems().addAll(new ArrayList<String>(Arrays.asList("All", "On-site", "Walk-in")));
    field.setOnAction(
        e -> {
          onChange.accept(field.valueProperty().getValue());
        });
    this.getChildren().add(field);
  }
}
