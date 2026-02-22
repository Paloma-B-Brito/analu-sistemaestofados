package api.dto; // Ou o seu pacote atual

public record DashboardDTO(
    long totalShowroom,
    long totalProducao,
    long totalCriticos,
    double totalReceita
) {}