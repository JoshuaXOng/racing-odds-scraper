package racing.odds.desktop.components;

import java.util.function.Consumer;
import java.util.ArrayList;
import java.util.Arrays;

import com.jfoenix.controls.JFXButton;
import com.jfoenix.controls.JFXTextField;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;

public class LoginForm {
  public static VBox get(Consumer<ArrayList<String>> onSubmit) {
    VBox container = new VBox(20);
    container.setAlignment(Pos.CENTER);

    JFXTextField usernameField = new JFXTextField("Username");
    container.getChildren().add(usernameField);
    
    JFXTextField passwordField = new JFXTextField("Password");
    container.getChildren().add(passwordField);
    
    JFXButton submitButton = new JFXButton("Login");
    submitButton.getStyleClass().add("button-raised login-form__submit-button");
    
    submitButton.setOnMouseReleased(e -> {
      onSubmit.accept(new ArrayList<String>(
        Arrays.asList(
          usernameField.textProperty().getValue(), 
          passwordField.textProperty().getValue()
        )
      )); 
    });
    container.getChildren().add(submitButton);
    
    return container;
  }
}
