package racing.odds.desktop.components;

import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

public class TestingSitesTable extends TableView<TestingSitesTable.TestingSite> {
  public static class TestingSite {
    String suburbName;
    String type;
    String isOnsiteOnly;
    String isOpen;
    String waitingTime;

    public TestingSite(
        String suburbName, String type, String isOnsiteOnly, String isOpen, String waitingTime) {
      this.suburbName = suburbName;
      this.type = type;
      this.isOnsiteOnly = isOnsiteOnly;
      this.isOpen = isOpen;
      this.waitingTime = waitingTime;
    }

    public String getSuburbName() {
      return this.suburbName;
    }

    public String getType() {
      return this.type;
    }

    public String getIsOnsiteOnly() {
      return this.isOnsiteOnly;
    }

    public String getIsOpen() {
      return this.isOpen;
    }

    public String getWaitingTime() {
      return this.waitingTime;
    }
  }

  public TestingSitesTable() {
    super();
    this.setMaxWidth(400);

    TableColumn<TestingSite, String> suburbNameColumn = new TableColumn<>("Suburb Name");
    this.getColumns().add(suburbNameColumn);
    TableColumn<TestingSite, String> typeColumn = new TableColumn<>("Type");
    this.getColumns().add(typeColumn);
    TableColumn<TestingSite, String> isOnsiteOnlyColumn = new TableColumn<>("On-site Only?");
    this.getColumns().add(isOnsiteOnlyColumn);
    TableColumn<TestingSite, String> isOpenColumn = new TableColumn<>("Open?");
    this.getColumns().add(isOpenColumn);
    TableColumn<TestingSite, String> waitingTimeColumn = new TableColumn<>("Waiting Time");
    this.getColumns().add(waitingTimeColumn);

    suburbNameColumn.setCellValueFactory(new PropertyValueFactory<>("suburbName"));
    typeColumn.setCellValueFactory(new PropertyValueFactory<>("type"));
    isOnsiteOnlyColumn.setCellValueFactory(new PropertyValueFactory<>("isOnsiteOnly"));
    isOpenColumn.setCellValueFactory(new PropertyValueFactory<>("isOpen"));
    waitingTimeColumn.setCellValueFactory(new PropertyValueFactory<>("waitingTime"));
  }

  public void addTestingSite(
      String suburbName, String type, String isOnsiteOnly, String isOpen, String waitingTime) {
    this.getItems().add(new TestingSite(suburbName, type, isOnsiteOnly, isOpen, waitingTime));
  }
}
