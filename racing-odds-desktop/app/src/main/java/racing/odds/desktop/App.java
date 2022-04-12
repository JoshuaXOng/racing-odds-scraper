package racing.odds.desktop;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import racing.odds.desktop.pages.*;

public class App extends Application {
  public static void main(String[] args) {
    launch();
  }

  @Override
  public void start(Stage stage) {
    Scene initialPage = LoginPage.get(stage);
    initialPage.getStylesheets().add("css/jfoenix-components.css");
    initialPage.getStylesheets().add("css/jxo-custom.css");

    stage.setScene(initialPage);

    stage.show();
  }
}
