package racing.odds.server.app.routes;

import java.util.List;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import racing.odds.server.app.database.models.Event;
import racing.odds.server.app.database.repositories.EventRepository;

@RestController
@RequestMapping(value="/api/v0/events")
public class EventsController {
    private MongoOperations mongoOps;
    private EventRepository repository;
    
    public EventsController(MongoOperations mongoOps, EventRepository repository) {
        this.mongoOps = mongoOps;
        this.repository = repository;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public Event getEvent(@PathVariable String id) {
        return this.repository.findOneById(id);
    }
    
    @RequestMapping(method=RequestMethod.GET)
    public List<Event> getEvents() {
        return this.repository.findAll();
    }
    
    @RequestMapping(method=RequestMethod.POST)
    public Event createEvent(@RequestBody Event event) {
        return mongoOps.insert(event);   
    }

    @RequestMapping(method=RequestMethod.PUT, value="/{id}")
    public Event updateEvent(@RequestBody Event event) {
        return mongoOps.save(event);   
    }
  
    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public List<Event> deleteEvent(@PathVariable String id) {
        return mongoOps.findAllAndRemove(Query.query(Criteria.where("id").is(id)), Event.class);
    }
}