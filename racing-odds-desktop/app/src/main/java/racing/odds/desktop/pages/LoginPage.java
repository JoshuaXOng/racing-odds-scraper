package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.layout.VBox;
import racing.odds.desktop.components.LoginForm;

public class LoginPage extends VBox {
  public LoginPage() {
    super(20);
    this.setAlignment(Pos.CENTER);
    this.getStylesheets().add("css/jfoenix-components.css");
    this.getStylesheets().add("css/jxo-custom.css");
    this.getStyleClass().add("login-page");

    VBox loginForm = new LoginForm(fields -> {});
    this.getChildren().add(loginForm);
  }
}
