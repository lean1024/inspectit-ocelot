package rocks.inspectit.ocelot.core.config;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Optional;

/**
 *
 */
@ExtendWith(MockitoExtension.class)
public class InspectitEnvironmentTest {

    @Mock
    ConfigurableApplicationContext ctx;

    @Test
    public void testJsonAgentArguments() {
        InspectitEnvironment env = new InspectitEnvironment(ctx, Optional.of("{ \"inspectit\": { \"service-name\": \"unit-test\"}}"));
        Assertions.assertThat(env.getCurrentConfig().getServiceName()).isEqualTo("unit-test");
    }

    @Test
    public void testInvalidJsonAgentArguments() {
        System.setProperty("inspectit.service-name", "fromproperties");
        InspectitEnvironment env = new InspectitEnvironment(ctx, Optional.of("I am not json but the config should be loaded anyway"));
        System.clearProperty("inspectit.service-name");
        Assertions.assertThat(env.getCurrentConfig().getServiceName()).isEqualTo("fromproperties");
    }


    @Test
    public void testNoJsonAgentArguments() {
        System.setProperty("inspectit.service-name", "abc");
        InspectitEnvironment env = new InspectitEnvironment(ctx, Optional.empty());
        System.clearProperty("inspectit.service-name");
        Assertions.assertThat(env.getCurrentConfig().getServiceName()).isEqualTo("abc");
    }
}
