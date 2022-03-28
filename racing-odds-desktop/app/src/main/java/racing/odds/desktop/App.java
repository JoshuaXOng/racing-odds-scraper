package racing.odds.desktop;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import racing.odds.desktop.pages.*;

public class App extends Application {
  public static void main(String[] args) {
    launch();
  }

  @Override
  public void start(Stage stage) {
    Scene initialPage = new Scene(new StackPane(), 1280, 720);
    initialPage.getStylesheets().add("css/jxo-custom.css");
    initialPage.getStylesheets().add("css/jfoenix-components.css");

    stage.setScene(initialPage);
    stage.setScene(JFoenixDemoPage.get(stage));
    stage.setScene(JavaFXDemoPage.get(stage));

    stage.show();
  }
}
