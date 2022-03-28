package racing.odds.server.app.database.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import racing.odds.server.app.database.models.Event;

public interface EventRepository extends MongoRepository<Event, String> {
  Event findOneById(String id);

  List<Event> findAll();
}
