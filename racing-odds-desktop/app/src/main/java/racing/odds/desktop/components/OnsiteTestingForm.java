package racing.odds.desktop.components;

import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import racing.odds.desktop.DataStore;

public class OnsiteTestingForm extends VBox {
  String testType;
  String patientId;
  String administererId;
  String bookingId;
  String notes;

  public OnsiteTestingForm() {
    super(20);
    this.setAlignment(Pos.CENTER);

    LabelledDropDownInput testTypeInput = new LabelledDropDownInput("Test Type", (value) -> { this.testType = value; });
    this.getChildren().add(testTypeInput);

    LabelledTextInput patientIdInput = new LabelledTextInput("Patient ID", "Patient ID", (value) -> { this.patientId = value; });
    this.getChildren().add(patientIdInput);

    LabelledTextInput administererIdInput = new LabelledTextInput("Administerer ID", "Administerer ID", (value) -> { this.administererId = value; });
    this.getChildren().add(administererIdInput);
    
    LabelledTextInput bookingIdInput = new LabelledTextInput("Booking ID", "Booking ID", (value) -> { this.bookingId = value; });
    this.getChildren().add(bookingIdInput);

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
