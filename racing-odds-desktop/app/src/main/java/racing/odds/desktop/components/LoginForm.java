package racing.odds.desktop.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.Utils;
import racing.odds.desktop.pages.HomePage;
import racing.odds.desktop.services.DemoAPI;

public class LoginForm extends VBox {
  String username;
  String password;

  public LoginForm(Consumer<ArrayList<String>> onSubmit) {
    super(20);
    this.setAlignment(Pos.CENTER);

    Text submitAlert = new Text("Credentials have failed!");
    submitAlert.getStyleClass().add("login-page__alert");
    this.getChildren().add(submitAlert);

    this.getChildren()
        .add(
            new LabelledTextInput(
                "Username",
                "Username",
                username -> {
                  this.username = username;
                }));
    this.getChildren()
        .add(
            new LabelledTextInput(
                "Password",
                "Password",
                password -> {
                  this.password = password;
                }));

    Button submitButton = new Button("Login");
    submitButton.getStyleClass().add("button-raised");
    submitButton.getStyleClass().add("login-form__submit-button");

    submitButton.setOnMouseReleased(
        e -> {
          try {
            DataStore.authToken = DemoAPI.getAuthToken(this.username, this.password).join().jwt;
            DataStore.pushPage(new HomePage());
          } catch (Exception exception) {
            submitAlert.getStyleClass().remove("login-page__alert");
            Utils.setTimeout(
                () -> {
                  submitAlert.getStyleClass().add("login-page__alert");
                },
                5000);
          }

          onSubmit.accept(new ArrayList<String>(Arrays.asList(this.username, this.password)));
        });

    this.getChildren().add(submitButton);
  }
}
