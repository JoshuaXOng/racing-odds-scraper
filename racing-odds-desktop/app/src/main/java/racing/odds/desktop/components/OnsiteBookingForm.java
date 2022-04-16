package racing.odds.desktop.components;

import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import racing.odds.desktop.DataStore;

public class OnsiteBookingForm extends VBox {
  String customerId;
  String testingSiteId;
  String startingTime;
  String notes;

  public OnsiteBookingForm() {
    super(20);
    this.setAlignment(Pos.CENTER);

    LabelledTextInput customerIdInput = new LabelledTextInput("Customed ID", "Customer ID", (value) -> { this.customerId = value; });
    this.getChildren().add(customerIdInput);

    LabelledTextInput testingSiteIdInput = new LabelledTextInput("Testing Site ID", "Testing Site ID", (value) -> { this.testingSiteId = value; });
    this.getChildren().add(testingSiteIdInput);

    LabelledTextInput startTimeInput = new LabelledTextInput("Start Time", "Start Time", (value) -> { this.testingSiteId = value; });
    this.getChildren().add(startTimeInput);

    LabelledTextAreaInput notesInput = new LabelledTextAreaInput("Notes", "Notes", (value) -> { this.notes = value; });
    this.getChildren().add(notesInput);

    Button submitButton = new Button("Submit");
    submitButton.setOnMouseClicked(e -> {
      ((StackPane) DataStore.mainScene.getRoot()).getChildren().add(new Modal("PIN Generation", "", () -> {
        ((StackPane) DataStore.mainScene.getRoot()).getChildren().remove(1);
      }));
    });
    this.getChildren().add(submitButton);
  }
}
