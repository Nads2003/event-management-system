package org.example.eventhubbackend.dto.user;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizerResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String profilePicture;
}
